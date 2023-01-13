export default interface IGuideContent {
    title: string;
    paragraphs: [
      {
        id?: number;
        title?: string;
        block?: string;
        inline?: [
          {
            text?: string;
            strong?: string;
            link?: {
              to: string;
              text: string;
            };
          }
        ];
        image?: {
          src: string;
          desc: string;
        };
      }
    ];
  }