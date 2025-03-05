import { Plugin, PluginSettingTab, App, Setting } from 'obsidian';

interface AnimationSettings {
    enableSidebar: boolean;
}

const DEFAULT_SETTINGS: AnimationSettings = {
    enableSidebar: false,
}

export default class AnimationPlugin extends Plugin {
    settings: AnimationSettings;

    async onload() {
        await this.loadSettings();

        this.refreshStyles();

        this.addSettingTab(new AnimationSettingTab(this.app, this));
    }

    refreshStyles() {
        // Remove sidebar animation class first
        document.body.classList.remove('enable-sidebar');

        // Add class based on settings
        if (this.settings.enableSidebar) {
            document.body.classList.add('enable-sidebar');
        }


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

        new Setting(containerEl)
            .setName('Enable Sidebar Animation')
            .setDesc('Toggle sidebar transition animations')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enableSidebar)
                .onChange(async (value) => {
                    this.plugin.settings.enableSidebar = value;
                    await this.plugin.saveSettings();
                }));

    }
}