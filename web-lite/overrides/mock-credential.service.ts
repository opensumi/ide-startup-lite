import { Injectable } from "@ali/common-di";
import { INativeCredentialService } from "@ali/ide-core-common/lib/credential";

@Injectable()
export class MockCredentialService implements INativeCredentialService {
  setPassword(service: string, account: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPassword(service: string, account: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  deletePassword(service: string, account: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findPassword(service: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  findCredentials(service: string): Promise<{ account: string; password: string; }[]> {
    throw new Error("Method not implemented.");
  }

}
