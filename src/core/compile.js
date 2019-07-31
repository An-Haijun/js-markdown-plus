export class Compile {

  constructor(jm) {
    this.compileT = jm.$options.compileT;
  }

  start(ctx) {
    const handle = this.compileT['handle'],
      handleOptions = this.compileT['options'] ? this.compileT['options'] : {};
    const html = handle(ctx, handleOptions);
    
    return html;
  }
};