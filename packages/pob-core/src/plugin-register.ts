import uniqid from "uniqid";
import ethers from "ethers";

export interface Workflow {
  type?: string;
  name?: string;
  init: (
    signerOrProvider?: ethers.providers.Provider | ethers.Signer,
    options?: { endpoint?: string }
  ) => void;
  [key: string]: any;
}

const assign = (plugins: Workflow[], target: Object): void => {
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    if (Array.isArray(plugin)) {
      assign(plugin, target);
      continue;
    }

    let name = plugin._name || plugin.name;
    if (!name) {
      plugin.name = name = uniqid(plugin.type + "-");
    }

    if (!plugin.type) {
      plugin.type = "workflow";
    }

    target[name] = plugin;
    plugin.init && plugin.init();
  }
};

export class PluginsContainer {
  plugins: Record<string, Workflow> = {};

  constructor(plugins: any = []) {
    assign(plugins, this.plugins);
  }

  byName<T extends Workflow = Workflow>(name: string): T {
    return this.plugins[name] as T;
  }

  byType<T extends Workflow>(type?: string): T[] {
    if (!type) {
      return Object.values(this.plugins) as T[];
    }
    return Object.values(this.plugins).filter(
      (pl: Workflow) => pl.type === type
    ) as T[];
  }

  register(...plugins: Workflow[]): void {
    assign(plugins, this.plugins);
  }

  unregister(name: string): void {
    delete this.plugins[name];
  }
}

export const plugins = new PluginsContainer();

export const registerPlugins = (...args: Workflow[]): void => {
  plugins.register(...args);
};

export const getPlugins = <T extends Workflow = Workflow>(type?: string) => {
  return plugins.byType<T>(type);
};

export const getPlugin = <T extends Workflow = Workflow>(name: string) => {
  return plugins.byName<T>(name);
};

export const unregisterPlugin = (name: string): void => {
  return plugins.unregister(name);
};
