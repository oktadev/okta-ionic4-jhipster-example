import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PhotoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-photo div table .btn-danger'));
  title = element.all(by.css('jhi-photo div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PhotoUpdatePage {
  pageTitle = element(by.id('jhi-photo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('field_description'));
  imageInput = element(by.id('file_image'));
  takenInput = element(by.id('field_taken'));
  albumSelect = element(by.id('field_album'));
  tagSelect = element(by.id('field_tag'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return await this.imageInput.getAttribute('value');
  }

  async setTakenInput(taken) {
    await this.takenInput.sendKeys(taken);
  }

  async getTakenInput() {
    return await this.takenInput.getAttribute('value');
  }

  async albumSelectLastOption(timeout?: number) {
    await this.albumSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async albumSelectOption(option) {
    await this.albumSelect.sendKeys(option);
  }

  getAlbumSelect(): ElementFinder {
    return this.albumSelect;
  }

  async getAlbumSelectedOption() {
    return await this.albumSelect.element(by.css('option:checked')).getText();
  }

  async tagSelectLastOption(timeout?: number) {
    await this.tagSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tagSelectOption(option) {
    await this.tagSelect.sendKeys(option);
  }

  getTagSelect(): ElementFinder {
    return this.tagSelect;
  }

  async getTagSelectedOption() {
    return await this.tagSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PhotoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-photo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-photo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
