import React from "react";
import PaintedLink from "shared/components/paintedLink/PaintedLink";
import { path } from "shared/utils/path";

function Unauthorized() {
  return <PaintedLink to={path.sign} value="sign" />;
}

export default Unauthorized;
