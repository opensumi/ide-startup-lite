import { Autowired } from '@opensumi/di';
import { Domain, ComponentContribution, ComponentRegistry, getIcon, CommandContribution, CommandRegistry, ClientAppContribution, Command, URI, CommandService, TabBarToolbarContribution, IToolbarRegistry, ToolbarRegistry } from '@opensumi/ide-core-browser';
import { IStatusBarService } from '@opensumi/ide-status-bar';
import { IWorkspaceService } from '@opensumi/ide-workspace';
import { IFileServiceClient } from '@opensumi/ide-file-service';
import { IMainLayoutService } from '@opensumi/ide-main-layout';
import { TestView, TestView2 } from './index.view';
import { IMenuRegistry, MenuContribution, MenuId } from '@opensumi/ide-core-browser/lib/menu/next';

const REFRESH: Command = {
  id: 'test.refresh',
  iconClass: getIcon('refresh'),
  label: '刷新视图',
};

@Domain(ClientAppContribution, ComponentContribution, CommandContribution, TabBarToolbarContribution, MenuContribution)
export class SampleContribution implements ClientAppContribution, ComponentContribution, CommandContribution, TabBarToolbarContribution, MenuContribution {

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
      component: TestView2,
      priority: 1,
      weight: 2,
    }, 'explorer', {name: 'OpenSumi'})
  }

  registerMenus(registry: IMenuRegistry) {
    registry.removeMenubarItem(MenuId.MenubarTerminalMenu);
    registry.registerMenubarItem('lite-', {
      label: 'Lite',
      order: 0
    });
  }

  registerToolbarItems(registry: ToolbarRegistry) {
    registry.registerItem({
      id: 'refresh_view',
      command: REFRESH.id,
      iconClass: getIcon('refresh'),
      label: '刷新视图',
      viewId: 'test',
    });
  }

  // 注册视图和token的绑定关系
  registerComponent(registry: ComponentRegistry) {
    registry.register('test-view', [
      {
        id: 'test',
        component: TestView,
        name: '预览视图',
      },
    ], {
      containerId: 'test',
      title: '测试视图',
      priority: 6,
      iconClass: getIcon('browser-preview'),
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
