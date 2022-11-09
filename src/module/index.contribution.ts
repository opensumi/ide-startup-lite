import { Autowired } from '@opensumi/di';
import { Domain, getIcon, CommandContribution, CommandRegistry, ClientAppContribution, Command, URI, CommandService, TabBarToolbarContribution, IToolbarRegistry, ToolbarRegistry } from '@opensumi/ide-core-browser';
import { IStatusBarService } from '@opensumi/ide-status-bar';
import { IWorkspaceService } from '@opensumi/ide-workspace';
import { IFileServiceClient } from '@opensumi/ide-file-service';
import { IMainLayoutService } from '@opensumi/ide-main-layout';
import { TestView } from './index.view';
import { IMenuRegistry, MenuContribution, MenuId } from '@opensumi/ide-core-browser/lib/menu/next';

const REFRESH: Command = {
  id: 'test.refresh',
  iconClass: getIcon('refresh'),
  label: 'Refresh',
};

@Domain(ClientAppContribution, CommandContribution, TabBarToolbarContribution, MenuContribution)
export class SampleContribution implements ClientAppContribution, CommandContribution, TabBarToolbarContribution, MenuContribution {

  @Autowired(IStatusBarService)
  statusBarService: IStatusBarService;

  @Autowired(IWorkspaceService)
  workspaceService: IWorkspaceService;

  @Autowired(IFileServiceClient)
  fileServiceClient: IFileServiceClient;

  @Autowired(IMainLayoutService)
  layoutService: IMainLayoutService;

  onDidStart() {
    this.layoutService.toggleSlot('right', true, 500);
    this.layoutService.collectViewComponent({
      id: 'test-accordion-view',
      name: 'HelloView',
      component: TestView,
      priority: 1,
      weight: 2,
    }, 'explorer', {name: 'OpenSumi'})
  }

  registerMenus(registry: IMenuRegistry) {
    const menuId = 'LiteMenu';
    registry.removeMenubarItem(MenuId.MenubarTerminalMenu);
    registry.registerMenubarItem(menuId, {
      label: 'Lite',
      order: 0
    });
    registry.registerMenuItem(menuId, {
      command: REFRESH.id,
      label: 'Refresh',
    });
  }

  registerToolbarItems(registry: ToolbarRegistry) {
    registry.registerItem({
      id: 'refresh_view',
      command: REFRESH.id,
      iconClass: getIcon('refresh'),
      label: 'Refresh',
      viewId: 'test',
    });
  }

  registerCommands(registry: CommandRegistry) {
    registry.registerCommand(REFRESH, {
      execute: () => {
        alert('try refresh!');
      }
    });
  }
}
