export const getCurrentTime = () => {
	return new Date().toLocaleString("id-ID", { weekday: "long", hour: "numeric", minute: "numeric", second: "numeric", hour12: false }); // 24-hour format
};
