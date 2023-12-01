import dynamic from "next/dynamic";

const DynamicButton2 = dynamic(() => {
  return import("./index");
});

export default DynamicButton2;
