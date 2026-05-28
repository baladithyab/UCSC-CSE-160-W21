class bufferarray {
  constructor(buftime) {
    this.arrbuf = new Array(buftime).fill(null);
  }
  push(newval) {
    var val = this.arrbuf.shift();
    this.arrbuf.push(newval);
    return val;
  }
}
