"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VERCEL_DEPLOY_HOOK_URL } from "@/lib/env";
import { addDomainToProject, removeDomainFromProject } from "@/lib/vercel-domains";
import type { ClientStatus } from "@shared/index";

const SLUG_RE = /^[a-z0-9-]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Create a new client row owned by the current user. */
export async function createClientRecord(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  if (!SLUG_RE.test(slug)) {
    redirect(`/new?error=${encodeURIComponent("slugは英小文字・数字・ハイフンのみ使用できます")}`);
  }
  if (!name) {
    redirect(`/new?error=${encodeURIComponent("表示名を入力してください")}`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("clients").insert({
    slug,
    name,
    status: "draft",
    owner_user_id: user.id,
  });

  if (error) {
    const msg =
      error.code === "23505" ? "そのslugは既に使われています" : "作成に失敗しました";
    redirect(`/new?error=${encodeURIComponent(msg)}`);
  }

  revalidatePath("/");
  redirect("/");
}

/** Update tag IDs, commitad link, and cv_events for a client. */
export async function updateClientRecord(clientId: string, formData: FormData) {
  const supabase = await createClient();

  const emptyToNull = (v: FormDataEntryValue | null) => {
    const s = String(v ?? "").trim();
    return s === "" ? null : s;
  };

  const notifyEmails = String(formData.get("notify_emails") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");
  const invalidEmail = notifyEmails.find((e) => !EMAIL_RE.test(e));
  if (invalidEmail) {
    redirect(
      `/clients/${clientId}?error=${encodeURIComponent(`通知先メールアドレスの形式が正しくありません: ${invalidEmail}`)}`,
    );
  }

  const { error } = await supabase
    .from("clients")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      meta_pixel_id: emptyToNull(formData.get("meta_pixel_id")),
      ga4_id: emptyToNull(formData.get("ga4_id")),
      gtm_id: emptyToNull(formData.get("gtm_id")),
      line_tag_id: emptyToNull(formData.get("line_tag_id")),
      meta_domain_verification: emptyToNull(formData.get("meta_domain_verification")),
      commitad_client_id: emptyToNull(formData.get("commitad_client_id")),
      notify_emails: notifyEmails,
      cv_events: {
        form_submit: formData.get("cv_form_submit") === "on",
        tel_tap: formData.get("cv_tel_tap") === "on",
        line_tap: formData.get("cv_line_tap") === "on",
      },
    })
    .eq("id", clientId);

  if (error) {
    redirect(`/clients/${clientId}?error=${encodeURIComponent("保存に失敗しました")}`);
  }

  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/");
  redirect(`/clients/${clientId}?saved=1`);
}

/** Toggle publish state and fire the Vercel Deploy Hook to rebuild the LP site. */
export async function setPublishState(clientId: string, next: ClientStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("clients")
    .update({ status: next })
    .eq("id", clientId);

  if (error) {
    redirect(`/clients/${clientId}?error=${encodeURIComponent("公開状態の更新に失敗しました")}`);
  }

  await fireDeployHook();

  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/");
  redirect(`/clients/${clientId}?saved=1`);
}

/** Update a client's custom domain + canonical flag, syncing the Vercel LP project. */
export async function updateCustomDomain(clientId: string, formData: FormData) {
  const supabase = await createClient();

  const domain = String(formData.get("custom_domain") ?? "")
    .trim()
    .toLowerCase();
  const canonical = formData.get("use_custom_domain_as_canonical") === "on";

  const { data: current } = await supabase
    .from("clients")
    .select("custom_domain")
    .eq("id", clientId)
    .maybeSingle();
  const previousDomain = current?.custom_domain ?? null;

  if (domain && domain !== previousDomain) {
    const result = await addDomainToProject(domain);
    if (!result.ok) {
      redirect(
        `/clients/${clientId}?error=${encodeURIComponent(result.error ?? "ドメイン追加に失敗しました")}`,
      );
    }
  }
  if (previousDomain && previousDomain !== domain) {
    await removeDomainFromProject(previousDomain);
  }

  const { error } = await supabase
    .from("clients")
    .update({
      custom_domain: domain || null,
      use_custom_domain_as_canonical: domain ? canonical : false,
    })
    .eq("id", clientId);

  if (error) {
    redirect(`/clients/${clientId}?error=${encodeURIComponent("ドメイン設定の保存に失敗しました")}`);
  }

  await fireDeployHook();

  revalidatePath(`/clients/${clientId}`);
  redirect(`/clients/${clientId}?saved=1`);
}

async function fireDeployHook() {
  if (!VERCEL_DEPLOY_HOOK_URL) {
    console.warn("[dashboard] VERCEL_DEPLOY_HOOK_URL 未設定 — デプロイをスキップしました");
    return;
  }
  try {
    await fetch(VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
  } catch (e) {
    console.error("[dashboard] Deploy Hook 発火に失敗:", e);
  }
}
