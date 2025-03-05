import { Plugin, PluginSettingTab, App, Setting } from 'obsidian';

interface AnimationSettings {
    enableSidebar: boolean;
    enableTooltip: boolean;
    enableTab: boolean;
    enableModal: boolean;
}

const DEFAULT_SETTINGS: AnimationSettings = {
    enableSidebar: false,
    enableTooltip: false,
    enableTab: false,
    enableModal: false
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
        document.body.classList.remove('enable-sidebar', 'enable-tooltip', 'enable-tab', 'enable-modal');

        // Add class based on settings
        if (this.settings.enableSidebar) {
            document.body.classList.add('enable-sidebar');
        }

        if(this.settings.enableTooltip) {
            document.body.classList.add('enable-tooltip');
        }

        if(this.settings.enableTab) {
            document.body.classList.add('enable-tab');
        }

        if(this.settings.enableModal) {
            document.body.classList.add('enable-modal');
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

        new Setting(containerEl)
            .setName('Enable Tooltip Animation')
            .setDesc('Toggle tooltip transition animations')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enableTooltip)
                .onChange(async (value) => {
                    this.plugin.settings.enableTooltip = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Enable Tab Animation')
            .setDesc('Toggle tab transition animations')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enableTab)
                .onChange(async (value) => {
                    this.plugin.settings.enableTab = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Enable Modal Animation')
            .setDesc('Toggle modal transition animations')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enableModal)
                .onChange(async (value) => {
                    this.plugin.settings.enableModal = value;
                    await this.plugin.saveSettings();
                }));
    }
}