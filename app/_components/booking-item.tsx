"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import PhoneNumber from "../barbershops/[id]/_components/phone-number";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      barbershop: true;
      service: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const isBookingConfirmed = isFuture(booking.date);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);
    try {
      cancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
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
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-5">
            <Image
              src="/barbershop-map.png"
              fill
              style={{ objectFit: "contain" }}
              alt=""
            />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card className="mx">
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div className="">
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <p className="text-xs overflow-hidden text-ellipsis text-nowrap">
                      {booking.barbershop.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="w-fit my-3"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card>
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <dl className="flex justify-between items-center">
                <dt className="text-gray-400 text-sm">Data</dt>
                <dd className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </dd>
              </dl>

              <dl className="flex justify-between items-center">
                <dt className="text-gray-400 text-sm">Horário</dt>
                <dd className="text-sm">{format(booking.date, "HH':'mm")}</dd>
              </dl>

              <dl className="flex justify-between items-center">
                <dt className="text-gray-400 text-sm">Barbearia</dt>
                <dd className="text-sm">{booking.barbershop.name}</dd>
              </dl>
            </CardContent>
          </Card>

          {booking.barbershop.phoneNumbers.length > 0 && (
            <div className="flex flex-col gap-3 mt-6 mb-8">
              {booking.barbershop.phoneNumbers.map((phoneNumber) => (
                <PhoneNumber
                  key={crypto.randomUUID()}
                  phoneNumber={phoneNumber}
                  hideCallButton
                />
              ))}
            </div>
          )}

          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            {isBookingConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="destructive" className="w-full">
                    Cancelar Reserva
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Deseja mesmo cancelar essa reserva?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Uma vez cancelada, não será possível reverter essa ação.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row gap-3">
                    <AlertDialogCancel className="w-full mt-0">
                      Voltar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="w-full"
                      onClick={handleCancelClick}
                      disabled={!isBookingConfirmed || isDeleteLoading}
                    >
                      {isDeleteLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Cancelar Reserva"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
