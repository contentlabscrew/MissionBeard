export type BlockType =
  | "header"
  | "hero"
  | "product"
  | "productGrid"
  | "text"
  | "ctaButton"
  | "divider"
  | "image"
  | "discount"
  | "footer";

export interface HeaderProps {
  logoUrl: string;
  logoAlt: string;
  backgroundColor: string;
  links: { text: string; url: string }[];
}

export interface HeroProps {
  imageUrl: string;
  imageAlt: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  backgroundColor: string;
  textColor: string;
}

export interface ProductProps {
  imageUrl: string;
  imageAlt: string;
  name: string;
  description: string;
  price: string;
  ctaText: string;
  ctaUrl: string;
}

export interface ProductGridProps {
  products: {
    imageUrl: string;
    imageAlt: string;
    name: string;
    price: string;
    ctaUrl: string;
  }[];
  ctaText: string;
  backgroundColor: string;
}

export interface TextProps {
  content: string;
  fontSize: number;
  textAlign: "left" | "center" | "right";
  color: string;
  backgroundColor: string;
}

export interface CTAButtonProps {
  text: string;
  url: string;
  backgroundColor: string;
  textColor: string;
  align: "left" | "center" | "right";
}

export interface DividerProps {
  color: string;
  spacing: number;
}

export interface ImageProps {
  src: string;
  alt: string;
  url: string;
  width: string;
}

export interface DiscountProps {
  code: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export interface FooterProps {
  companyName: string;
  address: string;
  socialLinks: { platform: string; url: string }[];
  unsubscribeUrl: string;
  backgroundColor: string;
  textColor: string;
}

export type BlockProps = {
  header: HeaderProps;
  hero: HeroProps;
  product: ProductProps;
  productGrid: ProductGridProps;
  text: TextProps;
  ctaButton: CTAButtonProps;
  divider: DividerProps;
  image: ImageProps;
  discount: DiscountProps;
  footer: FooterProps;
};

export interface Block<T extends BlockType = BlockType> {
  id: string;
  type: T;
  props: BlockProps[T];
}

export interface EmailDraft {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export interface KlaviyoTemplate {
  id: string;
  name: string;
  editorType: string;
  html: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
