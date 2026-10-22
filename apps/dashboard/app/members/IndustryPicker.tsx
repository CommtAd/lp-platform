import { INDUSTRIES, INDUSTRY_LABEL, type Industry } from "@shared/index";

/**
 * 「見られる業種」の選択。
 *
 * `全業種` にチェックが入っていればそれが優先される（server action 側で判定）。
 * 1つも選ばない状態は「何も見えない」という無意味な設定になるので、
 * server action でエラーにしている。
 */
export default function IndustryPicker({
  current,
  idPrefix,
}: {
  /** null = 制限なし。 */
  current: Industry[] | null;
  idPrefix: string;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-1 text-sm font-medium">見られる業種</legend>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="industries_all"
          defaultChecked={current === null}
          className="h-4 w-4 rounded border-neutral-300"
        />
        全業種（制限なし）
      </label>

      <div className="flex flex-wrap gap-x-4 gap-y-2 border-l-2 border-neutral-200 pl-4">
        {INDUSTRIES.map((key) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id={`${idPrefix}-${key}`}
              name="industries"
              value={key}
              defaultChecked={current?.includes(key) ?? false}
              className="h-4 w-4 rounded border-neutral-300"
            />
            {INDUSTRY_LABEL[key]}
          </label>
        ))}
      </div>

      <p className="text-xs text-neutral-500">
        「全業種」にチェックが入っている場合は、下の個別指定より優先されます。
      </p>
    </fieldset>
  );
}
