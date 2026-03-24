import { BlockType, Block, BlockProps } from "@/types";
import { brand } from "./brand";

interface BlockDefinition {
  type: BlockType;
  label: string;
  description: string;
  icon: string;
  defaultProps: BlockProps[BlockType];
}

export const blockDefinitions: BlockDefinition[] = [
  {
    type: "header",
    label: "Header",
    description: "Logo and navigation links",
    icon: "LayoutTemplate",
    defaultProps: {
      logoUrl: "https://via.placeholder.com/200x60/01070E/E98517?text=MISSION+BEARD",
      logoAlt: "Mission Beard",
      backgroundColor: brand.colors.dark,
      links: [
        { text: "Shop", url: "https://missionbeard.com/collections/store" },
        { text: "Learn", url: "https://missionbeard.com/blogs/learn" },
      ],
    } as BlockProps["header"],
  },
  {
    type: "hero",
    label: "Hero Image",
    description: "Full-width image with headline and CTA",
    icon: "Image",
    defaultProps: {
      imageUrl: "https://via.placeholder.com/600x300/01070E/E98517?text=Hero+Image",
      imageAlt: "Hero image",
      headline: "Your Beard Deserves Better",
      subheadline: "Discover our range of premium, UK-made beard care products.",
      ctaText: "Shop Now",
      ctaUrl: "https://missionbeard.com/collections/store",
      backgroundColor: brand.colors.dark,
      textColor: brand.colors.white,
    } as BlockProps["hero"],
  },
  {
    type: "product",
    label: "Product Card",
    description: "Single product with image, price, and CTA",
    icon: "Package",
    defaultProps: {
      imageUrl: "https://via.placeholder.com/280x280/F5F5F5/01070E?text=Product",
      imageAlt: "Product image",
      name: "Underdog Beard Oil",
      description: "A rich blend of 13 nourishing natural ingredients. 100% natural, cruelty-free, made in the UK.",
      price: "£14.99",
      ctaText: "Shop Now",
      ctaUrl: "https://missionbeard.com/products/underdog-beard-oil",
    } as BlockProps["product"],
  },
  {
    type: "productGrid",
    label: "Product Grid",
    description: "2-column grid of products",
    icon: "LayoutGrid",
    defaultProps: {
      products: [
        {
          imageUrl: "https://via.placeholder.com/260x260/F5F5F5/01070E?text=Product+1",
          imageAlt: "Product 1",
          name: "Underdog Beard Oil",
          price: "£14.99",
          ctaUrl: "https://missionbeard.com/products/underdog-beard-oil",
        },
        {
          imageUrl: "https://via.placeholder.com/260x260/F5F5F5/01070E?text=Product+2",
          imageAlt: "Product 2",
          name: "Underdog Beard Balm",
          price: "£12.99",
          ctaUrl: "https://missionbeard.com/products/underdog-beard-balm",
        },
      ],
      ctaText: "Shop Now",
      backgroundColor: brand.colors.white,
    } as BlockProps["productGrid"],
  },
  {
    type: "text",
    label: "Text Block",
    description: "Paragraph of text",
    icon: "Type",
    defaultProps: {
      content: "Your beard's got questions. We've got the answers. Discover the products your beard was grown for.",
      fontSize: 16,
      textAlign: "left" as const,
      color: brand.colors.dark,
      backgroundColor: brand.colors.white,
    } as BlockProps["text"],
  },
  {
    type: "ctaButton",
    label: "CTA Button",
    description: "Call-to-action button",
    icon: "MousePointerClick",
    defaultProps: {
      text: "Shop Now",
      url: "https://missionbeard.com/collections/store",
      backgroundColor: brand.colors.primary,
      textColor: brand.colors.white,
      align: "center" as const,
    } as BlockProps["ctaButton"],
  },
  {
    type: "divider",
    label: "Divider",
    description: "Horizontal line spacer",
    icon: "Minus",
    defaultProps: {
      color: brand.colors.border,
      spacing: 20,
    } as BlockProps["divider"],
  },
  {
    type: "image",
    label: "Image",
    description: "Full-width or inline image",
    icon: "ImageIcon",
    defaultProps: {
      src: "https://via.placeholder.com/600x300/01070E/E98517?text=Image",
      alt: "Image",
      url: "",
      width: "100%",
    } as BlockProps["image"],
  },
  {
    type: "discount",
    label: "Discount Banner",
    description: "Promo code or discount offer",
    icon: "Percent",
    defaultProps: {
      code: "BEARD20",
      description: "Get 20% off your next order",
      backgroundColor: brand.colors.primary,
      textColor: brand.colors.white,
      accentColor: brand.colors.dark,
    } as BlockProps["discount"],
  },
  {
    type: "footer",
    label: "Footer",
    description: "Social links, unsubscribe, company info",
    icon: "PanelBottom",
    defaultProps: {
      companyName: brand.company.name,
      address: brand.company.address,
      socialLinks: [
        { platform: "Instagram", url: "https://instagram.com/missionbeard" },
        { platform: "Facebook", url: "https://facebook.com/missionbeardgroomingco" },
      ],
      unsubscribeUrl: "{{ unsubscribe_url }}",
      backgroundColor: brand.colors.dark,
      textColor: "#999999",
    } as BlockProps["footer"],
  },
];

let nextId = 1;
export function createBlock(type: BlockType): Block {
  const def = blockDefinitions.find((d) => d.type === type);
  if (!def) throw new Error(`Unknown block type: ${type}`);
  return {
    id: `block_${Date.now()}_${nextId++}`,
    type,
    props: JSON.parse(JSON.stringify(def.defaultProps)),
  };
}

export function getBlockDefinition(type: BlockType) {
  return blockDefinitions.find((d) => d.type === type);
}
