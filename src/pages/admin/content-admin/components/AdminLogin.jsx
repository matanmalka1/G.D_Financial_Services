import { Button } from "../../../../components/ui/primitives/Button";

export const AdminLogin = ({
  password,
  setPassword,
  onSubmit,
  isAdminEnabled,
  requiresPassword,
}) => (
  <div className="min-h-[calc(100vh-10rem)] bg-slate-100 px-4 py-12">
    <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
        Admin
      </p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">עריכת אתר פשוטה</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {!isAdminEnabled
          ? "מסך הניהול כבוי בפרודקשן כי לא הוגדרה סיסמת אדמין ב־env."
          : requiresPassword
            ? "הזן סיסמת אדמין כדי לעדכן טקסטים באתר בלי לגעת בקוד."
            : "לא הוגדרה סיסמת אדמין ב־env, ולכן מסך הניהול פתוח כרגע בסביבה המקומית."}
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {isAdminEnabled && requiresPassword ? (
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">סיסמה</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
              placeholder="הקלד סיסמה"
            />
          </label>
        ) : null}

        {isAdminEnabled ? (
          <Button className="w-full rounded-2xl py-3 text-base" type="submit">
            כניסה למסך הניהול
          </Button>
        ) : null}
      </form>
    </div>
  </div>
);
