import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="p-5 justify-between flex flex-row">
        <Image src="/logo.svg" alt="FSW Barber" height={22} width={120} />
        <Button variant="outline" size="icon">
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
