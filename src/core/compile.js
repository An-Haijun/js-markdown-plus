import Marked from "marked";

export class Compile {

  constructor(jm) {
  }

  start(ctx) {
    const handle = Marked;
    const html = handle(ctx);
    
    return html;
  }
};