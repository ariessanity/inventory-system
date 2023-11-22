import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    contactName: string;

    @IsNotEmpty()
    @IsPhoneNumber('PH')
    contactNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    remarks: string;
}
