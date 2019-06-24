import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Tag } from './tag.model';
import { TagService } from './tag.service';

@Component({
    selector: 'page-tag',
    templateUrl: 'tag.html'
})
export class TagPage {
    tags: Tag[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private tagService: TagService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.tags = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.tagService.query().pipe(
            filter((res: HttpResponse<Tag[]>) => res.ok),
            map((res: HttpResponse<Tag[]>) => res.body)
        )
        .subscribe(
            (response: Tag[]) => {
                this.tags = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Tag) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/tag/new');
    }

    edit(item: IonItemSliding, tag: Tag) {
        this.navController.navigateForward('/tabs/entities/tag/' + tag.id + '/edit');
        item.close();
    }

    async delete(tag) {
        this.tagService.delete(tag.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Tag deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(tag: Tag) {
        this.navController.navigateForward('/tabs/entities/tag/' + tag.id + '/view');
    }
}
