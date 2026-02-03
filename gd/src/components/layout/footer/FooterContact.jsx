export const FooterContact = ({ t }) => (
  <div>
    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
      {t.footer.addressTitle}
    </h3>
    <p className="text-sm text-slate-600 mb-2">{t.footer.address}</p>
    <p className="text-sm text-slate-600 mb-2">{t.footer.email}</p>
    <p className="text-sm text-slate-600 ">{t.footer.phone}</p>
  </div>
);
