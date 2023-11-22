import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    contactName: string;

    @IsNotEmpty()
    @IsPhoneNumber('PH', {message: "Contact number must be a valid phone number"})
    contactNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    remarks: string;
}
