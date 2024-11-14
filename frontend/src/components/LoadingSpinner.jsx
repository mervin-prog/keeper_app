import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className="spinner">
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;