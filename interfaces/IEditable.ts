export default interface IGuideContent {
  title: string;
  paragraphs: IParagraph[];
}

export interface IParagraph {
  title?: string;
  inline?: IInline[];
  image?: {
    src: string;
    desc: string;
  };
}
export interface IInline {
  text?: string;
  strong?: string;
  link?: ILink;
}

export interface ILink {
  to: string;
  text: string;
}
