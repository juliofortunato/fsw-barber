import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      barbershop: true;
      service: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date);

  return (
    <Card>
      <CardContent className="px-0 py-0 flex">
        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="w-fit"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h2 className="font-bold">{booking.service.name}</h2>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.service.imageUrl} />
              <AvatarFallback>
                {booking.service.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary flex-1 px-3">
          <p className="text-s capitalize">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "HH':'mm")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
