import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ManagerService } from "../service/manager.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-diamond-list',
  templateUrl: './manage-diamond-list.component.html',
  styleUrls: ['./manage-diamond-list.component.css']
})
export class ManageDiamondListComponent implements OnInit {
  diamonds: any[] = [];
  searchDiamondForm!: FormGroup;
  editableColumns = [
    { field: 'cut.id', header: 'Cut ID' },
    { field: 'color.id', header: 'Color ID' },
    { field: 'clarity.id', header: 'Clarity ID' },
    { field: 'shape.id', header: 'Shape ID' },
    { field: 'carat', header: 'Carat' },
  ];

  displayedColumns = ['id', ...this.editableColumns.map(c => c.field), 'save', 'delete'];

  constructor(private managerService: ManagerService,
              private titleService: Title,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getDiamonds();
    this.titleService.setTitle('Diamond List | Luci di Lusso');
    this.searchDiamondForm = this.fb.group({
      title: [null, [Validators.minLength(1)]]
    });
  }

  getDiamonds(): void {
    this.diamonds = [];
    this.managerService.getAllDiamonds().subscribe(response => {
      this.diamonds = response.diamonds.map(d => ({ ...d, isEditMode: false }));
    });
  }

  deleteDiamond(diamondId: any) {
    this.managerService.deleteDiamond(diamondId).subscribe(response => {
      if (response == null) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('showSnackbar', 'true');
        }
        window.location.reload();
      } else {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  editDiamond(diamond: any) {
    this.diamonds = this.diamonds.map(d => {
      if (d.id === diamond.id) {
        return { ...d, isEditMode: true };
      }
      return d;
    });
  }

  saveDiamond(editedDiamond: any) {
    const diamondToSave = {
      id: editedDiamond.id,
      clarityId: editedDiamond.clarity.id,
      cutId: editedDiamond.cut.id,
      colorId: editedDiamond.color.id,
      carat: editedDiamond.carat,
      shapeId: editedDiamond.shape.id
    };

    this.managerService.saveDiamond(diamondToSave).subscribe({
      next: (response) => {
        this.snackBar.open('Diamond updated successfully', 'Close', {
          duration: 5000,
          panelClass: 'success-snackbar'
        });
        this.getDiamonds(); // Refresh the list
      },
      error: () => {
        this.snackBar.open('Error updating diamond', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o && o[p], obj);
  }

  setNestedProperty(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const lastObj = keys.reduce((o, p) => o && o[p], obj);
    if (lastObj && lastKey) {
      lastObj[lastKey] = value;
    }
  }
}
