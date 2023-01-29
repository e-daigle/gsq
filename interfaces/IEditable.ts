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
  link?: {
    to: string;
    text: string;
  };
}
