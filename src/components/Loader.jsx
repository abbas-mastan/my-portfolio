import { Html, useProgress } from "@react-three/drei";
import { progress } from "framer-motion";
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <span className="canvas-load">
        <p className="text-[14px] text-[#f1f1f1] font-[800] mt-[40px] ">{progress.toFixed(2)}%</p>
      </span>
    </Html>
  )
}

export default Loader