import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/icon";

// Importar as imagens PNG
import instagramIcon from "@/assets/icons/instagram.png";
import facebookIcon from "@/assets/icons/facebook.png";

export interface InputProps extends React.ComponentProps<"input"> {
	leftIcon?: IconName | "instagram" | "facebook";
	rightIcon?: IconName | "instagram" | "facebook";
	onRightIconClick?: () => void;
	showPasswordToggle?: boolean;
	label?: string;
	mask?: "cep" | "phone" | "cnpj";
	onMaskedChange?: (value: string, unmaskedValue: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			label,
			leftIcon,
			rightIcon,
			onRightIconClick,
			showPasswordToggle = false,
			mask,
			onMaskedChange,
			onChange,
			...props
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [inputType, setInputType] = useState(type);

		useEffect(() => {
			if (showPasswordToggle && type === "password") {
				setInputType(showPassword ? "text" : "password");
			} else {
				setInputType(type);
			}
		}, [showPassword, type, showPasswordToggle]);

		const handlePasswordToggle = () => setShowPassword((prev) => !prev);

		const handleRightIconClick = () => {
			if (showPasswordToggle && type === "password") {
				handlePasswordToggle();
			} else if (onRightIconClick) {
				onRightIconClick();
			}
		};

		// Função para aplicar máscaras
		const applyMask = (value: string, maskType: string): string => {
			const cleanValue = value.replace(/\D/g, "");

			switch (maskType) {
				case "cep":
					return cleanValue.replace(/(\d{5})(\d{3})/, "$1-$2");
				case "phone":
					if (cleanValue.length <= 10) {
						return cleanValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
					} else {
						return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
					}
				case "cnpj":
					return cleanValue.replace(
						/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
						"$1.$2.$3/$4-$5",
					);
				default:
					return value;
			}
		};

		// Função para obter o limite de caracteres baseado na máscara
		const getMaxLength = (maskType?: string): number | undefined => {
			switch (maskType) {
				case "cep":
					return 9; // 00000-000
				case "phone":
					return 15; // (00) 00000-0000
				case "cnpj":
					return 18; // 00.000.000/0000-00
				default:
					return undefined;
			}
		};

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;

			if (mask) {
				const unmaskedValue = value.replace(/\D/g, "");

				let limitedValue = unmaskedValue;
				if (mask === "cep" && unmaskedValue.length > 8) {
					limitedValue = unmaskedValue.slice(0, 8);
				} else if (mask === "phone" && unmaskedValue.length > 11) {
					limitedValue = unmaskedValue.slice(0, 11);
				} else if (mask === "cnpj" && unmaskedValue.length > 14) {
					limitedValue = unmaskedValue.slice(0, 14);
				}

				const maskedValue = applyMask(limitedValue, mask);
				e.target.value = maskedValue;

				if (onMaskedChange) {
					onMaskedChange(maskedValue, limitedValue);
				}
			}

			if (onChange) {
				onChange(e);
			}
		};

		const getRightIcon = (): IconName => {
			if (showPasswordToggle && type === "password") {
				return showPassword ? "eyeOff" : "eye";
			}
			return (rightIcon as IconName) || ("search" as IconName);
		};

		const renderIcon = (
			iconName: IconName | "instagram" | "facebook",
			size: number = 18,
		) => {
			if (iconName === "instagram") {
				return (
					<img
						src={instagramIcon}
						alt="Instagram"
						width={size}
						height={size}
						className="object-contain"
					/>
				);
			}
			if (iconName === "facebook") {
				return (
					<img
						src={facebookIcon}
						alt="Facebook"
						width={size}
						height={size}
						className="object-contain"
					/>
				);
			}
			return <Icon name={iconName as IconName} size={size} />;
		};

		const hasRightElement =
			Boolean(rightIcon) || (showPasswordToggle && type === "password");

		return (
			<div className="grid w-full items-center gap-1.5">
				{label && (
					// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
					<label className="flex items-center justify-between w-full">
						{label}
					</label>
				)}

				<div className="relative">
					{leftIcon && (
						<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground">
							{renderIcon(leftIcon, 18)}
						</div>
					)}

					<input
						type={inputType}
						data-slot="input"
						maxLength={getMaxLength(mask)}
						className={cn(
							"mt-1 pl-3 pr-3 text-primary-foreground file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
							"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
							"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
							leftIcon && "pl-10",
							hasRightElement && "pr-10",
							className,
						)}
						ref={ref}
						onChange={handleInputChange}
						{...props}
					/>

					{hasRightElement && (
						<button
							type="button"
							onClick={handleRightIconClick}
							className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground z-10"
							tabIndex={-1}
						>
							{rightIcon &&
							rightIcon !== "instagram" &&
							rightIcon !== "facebook" ? (
								renderIcon(rightIcon, 18)
							) : (
								<Icon name={getRightIcon()} size={18} />
							)}
						</button>
					)}
				</div>
			</div>
		);
	},
);

Input.displayName = "Input";
