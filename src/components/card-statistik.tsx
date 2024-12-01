import React from "react";
import { Card, CardContent } from "@/components/ui/card";
export default function CardStatistik({ title, value }: { title: string; value: number }) {
	return (
		<div>
			<Card className="h-36 bg-primary text-primary-foreground">
				<CardContent className="p-5 flex justify-between items-center h-full">
					<p className="text-xl">{title}</p>
					<p className="text-7xl font-bold">{value}</p>
				</CardContent>
			</Card>
		</div>
	);
}
