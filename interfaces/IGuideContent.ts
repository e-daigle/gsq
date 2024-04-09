export default interface IGuideContent {
    title: string;
    description: string;
    modified_at: string;
    created_at: string;
    paragraphs: [
      {
        title?: string;
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