"use client";

import { CopyIcon, SmartphoneIcon } from "lucide-react";
import { formatPhoneNumber } from "../_helpers/phone";
import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";

interface PhoneNumberProps {
  hideCallButton?: boolean;
  phoneNumber: string;
}

const PhoneNumber = ({ phoneNumber, hideCallButton }: PhoneNumberProps) => {
  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(phoneNumber);
    toast("Número de telefone copiado para a área de transferência!", {
      action: {
        label: "Fechar",
        onClick: () => {},
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={24} />
        <span>{formatPhoneNumber(phoneNumber)}</span>
      </div>

      <div className="flex items-center gap-2">
        {!hideCallButton && (
          <Button variant="secondary" size="icon" className="px-7" asChild>
            <a href={`tel:${phoneNumber}`}>Ligar</a>
          </Button>
        )}
        <Button variant="secondary" size="icon" onClick={handleCopyClick}>
          <CopyIcon />
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumber;
