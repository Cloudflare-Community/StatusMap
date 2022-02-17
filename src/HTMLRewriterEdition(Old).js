/*
async function getStatus() : Promise<FullStatus> {
  const s = new StatusFetch();
  await new HTMLRewriter().on("div.child-components-container div.component-inner-container span", s).transform(await fetch("https://www.cloudflarestatus.com/")).arrayBuffer();
  const obj : FullStatus = {};
  for(const status of s.arr.filter(e => e.name.includes("(") && !e.name.includes("BYOIP")) as ColoStatus[]) {
    let split = status.name.split("-");
    const iata = split[split.length-1].trim().replace("(", "").replace(")", "")
    if(iata === "Au") console.log(status.name);
    status.name = status.name.replace(` -${split[split.length-1]}`, "").trim();
    obj[iata] = status;
  }
  return obj;
}

class StatusFetch {
  arr: any[];
  type: string;
  pos: number;
  first: boolean;
  constructor() {
    this.arr = [];
    this.pos = -1;
    this.type = "";
    this.first = true;
  }
  element(element: Element) {
    const cl = (Object.fromEntries(element.attributes).class as string).trim();
    if(cl === "name") {
      this.type = "name";
      this.arr[++this.pos] = {name: "", status: ""};
    } else if(cl === "component-status") {
      this.type = "status";
    } else element.remove();
  }
  text(chunk: Text) {
    if(chunk.lastInTextNode) {
      this.arr[this.pos][this.type] = this.arr[this.pos][this.type].trim().replace("?", "");
      return;
    }
    if(!this.arr[this.pos]) this.arr[this.pos] = {name: "", status: ""};
    this.arr[this.pos][this.type] += chunk.text;
  }
}
*/