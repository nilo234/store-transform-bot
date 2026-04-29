import { useEffect, useState } from "react";
import { getRegion, setRegion, type RegionCode } from "@/lib/region";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LABELS: Record<RegionCode, string> = {
  US: "US · USD",
  GB: "UK · GBP",
};

export const RegionSwitcher = () => {
  const [region, setRegionState] = useState<RegionCode>("US");

  useEffect(() => {
    setRegionState(getRegion());
  }, []);

  const handleChange = (next: RegionCode) => {
    if (next === region) return;
    setRegion(next);
    setRegionState(next);
    // Force a reload so all Shopify queries re-fetch in the new currency
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-2 text-xs font-medium gap-1.5"
          aria-label="Select region"
        >
          <Globe className="h-4 w-4" strokeWidth={1.5} />
          <span>{LABELS[region]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background z-50">
        <DropdownMenuItem onClick={() => handleChange("US")}>
          🇺🇸 United States · USD
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange("GB")}>
          🇬🇧 United Kingdom · GBP
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
