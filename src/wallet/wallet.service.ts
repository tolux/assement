import { Injectable } from "@nestjs/common";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { UpdateWalletDto } from "./dto/update-wallet.dto";

@Injectable()
export class WalletService {
  create(createWalletDto: CreateWalletDto) {
    return "This action adds a new wallet";
  }

  findAll() {
    // const today = new Date();
    // const referral_code = `sma-${data.first_name.slice(
    //   0,
    //   3,
    // )}-${today.getTime()}`;
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
