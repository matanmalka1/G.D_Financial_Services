import { Instagram, Facebook, Linkedin } from "lucide-react";

const baseClasses = "w-5 h-5";

export const InstagramLogo = (props) => (
  <Instagram className={baseClasses} strokeWidth={2} {...props} />
);

export const FacebookLogo = (props) => (
  <Facebook className={baseClasses} strokeWidth={2} {...props} />
);

export const LinkedInLogo = (props) => (
  <Linkedin className={baseClasses} strokeWidth={2} {...props} />
);
