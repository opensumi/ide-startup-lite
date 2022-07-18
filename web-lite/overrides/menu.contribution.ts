import { Autowired } from '@opensumi/di';
import { ClientAppContribution, Domain } from '@opensumi/ide-core-browser';
import { IMenuRegistry, MenuContribution, MenuId } from '@opensumi/ide-core-browser/lib/menu/next';

@Domain(ClientAppContribution)
export class MenuOverrideContribution implements ClientAppContribution {

  @Autowired()
  private readonly menuRegistry: IMenuRegistry;
  
  onStart() {
    this.menuRegistry.removeMenubarItem(MenuId.MenubarTerminalMenu);
  }

}
