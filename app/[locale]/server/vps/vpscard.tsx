import CustomButton from "@/components/CustomButton";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export function VPSCard({ id, name, cpu, ram, storage, price }) {
    const t = useTranslations("server.vps");
    const locale = useLocale();
    return (
        <div
        className="
            w-full 
            bg-white 
            border 
            border-gray-200 
            rounded-2xl 
            p-6 
            shadow-sm
            hover:shadow-md
            transition-all
            flex flex-col
            justify-between
        "
        >
        {/* Title */}
        <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        </div>

        {/* Specs */}
        <div className="flex flex-col gap-1 text-gray-600 text-sm text-center leading-relaxed mb-4">
            <div>{cpu}</div>
            <div>{ram}</div>
            <div>{storage}</div>
        </div>

        {/* Price */}
        <div className="text-center mb-5">
            <p className="text-xl font-bold text-gray-800">{price}</p>
            <p className="text-xs text-gray-400 mt-1"> {t('monthly')} </p>
        </div>

        {/* Button */}
        <Link href={`/${locale}/server/vps/${id}/configure`}>
            <CustomButton
                btnType="submit"
                className="w-full"
            >
                {t('order')}
                <span className="text-lg">🛒</span>
            </CustomButton>
        </Link>
        </div>
    );
}
