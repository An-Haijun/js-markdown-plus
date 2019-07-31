import marked from "marked";

export class Compile {

  constructor(jm) {
  }

  start(ctx) {
    const handle = marked;
    const html = handle(ctx);
    
    return html;
  }
};