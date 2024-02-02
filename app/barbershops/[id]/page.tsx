import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { Button } from "@/app/_components/ui/button";
import { CopyIcon, SmartphoneIcon } from "lucide-react";
import { formatPhoneNumber } from "./_helpers/phone";
import PhoneNumber from "./_components/phone-number";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    // TODO: redirecionar para a homepage
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    // TODO: redirecionar para a homepage
    return null;
  }

  return (
    <>
      <BarbershopInfo barbershop={barbershop} />

      <div className="flex flex-col gap-4 px-5 py-6">
        <Tabs defaultValue="services">
          <TabsList className="flex items-center justify-start bg-transparent gap-2 p-0 mb-6">
            <TabsTrigger asChild value="services">
              <Button
                variant="outline"
                className="data-[state=active]:text-white data-[state=active]:bg-primary"
              >
                Serviços
              </Button>
            </TabsTrigger>
            <TabsTrigger asChild value="info">
              <Button
                variant="outline"
                className="data-[state=active]:text-white data-[state=active]:bg-primary"
              >
                Informações
              </Button>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="services" className="flex flex-col gap-4">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={barbershop}
                service={service}
                isAuthenticated={!!session?.user}
              />
            ))}
          </TabsContent>
          <TabsContent value="info">
            <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
              Sobre nós
            </h2>
            <p className="text-sm">{barbershop.description}</p>

            {barbershop.phoneNumbers.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-solid border-secondary py-5 mt-6">
                {barbershop.phoneNumbers.map((phoneNumber) => (
                  <PhoneNumber
                    key={crypto.randomUUID()}
                    phoneNumber={phoneNumber}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default BarbershopDetailsPage;
