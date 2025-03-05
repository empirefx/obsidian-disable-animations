import { Plugin, PluginSettingTab, App, Setting } from 'obsidian';

interface AnimationSettings {
}

const DEFAULT_SETTINGS: AnimationSettings = {
}

export default class AnimationPlugin extends Plugin {
    settings: AnimationSettings;

    async onload() {
        await this.loadSettings();

        this.refreshStyles();

        this.addSettingTab(new AnimationSettingTab(this.app, this));
    }

    refreshStyles() {


    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.refreshStyles();
    }
}

class AnimationSettingTab extends PluginSettingTab {
    plugin: AnimationPlugin;

    constructor(app: App, plugin: AnimationPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

    }
}