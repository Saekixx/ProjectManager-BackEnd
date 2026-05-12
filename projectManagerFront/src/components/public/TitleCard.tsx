import { Card } from "../ui/card";

function TitleCard({ title }: { title: string }) {
  return <Card className="p-6 w-full text-2xl font-bold">{title}</Card>;
}

export default TitleCard;
