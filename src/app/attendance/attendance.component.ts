import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';

export interface Interval {
  inTime: string;
  outTime: string;
  index: number; // Add index property to Interval
}

export interface UserType {
  id: string;
  name: string;
  inTime: string;
  outTime: string;
  date: Date;
  intervals: Interval[];
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
  ],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceComponent {
  employees: string[] = ['', 'Zeus', 'Hera', 'Poseidon'];
  displayedColumns: string[] = [
    'id',
    'name',
    'inTime',
    'outTime',
    'date',
    'action',
  ];

  dataSource: MatTableDataSource<UserType>;
  startDate: Date | null = null;
  selectedEmployee: string = '';

  constructor(private _dialog: MatDialog) {
    const tableContent = [
      {
        id: '1',
        name: 'Zeus',
        inTime: '09:00',
        outTime: '17:00',
        date: new Date(2023, 9, 26), // Example: new Date(year, monthIndex, day)
        intervals: [
          { inTime: '09:00', outTime: '10:50', index: 1 },
          { inTime: '10:50', outTime: '12:00', index: 2 },
          { inTime: '13:00', outTime: '14:45', index: 3 },
        ],
      },
      {
        id: '2',
        name: 'Hera',
        inTime: '08:30',
        outTime: '16:30',
        date: new Date(2023, 9, 27),
        intervals: [
          { inTime: '09:00', outTime: '12:00', index: 1 },
          { inTime: '13:00', outTime: '17:00', index: 2 },
        ],
      },
      {
        id: '3',
        name: 'Poseidon',
        inTime: '10:00',
        outTime: '18:00',
        date: new Date(2023, 9, 28),
        intervals: [
          { inTime: '09:00', outTime: '12:00', index: 1 },
          { inTime: '13:00', outTime: '17:00', index: 2 },
        ],
      },
      {
        id: '4',
        name: 'Zeus',
        inTime: '09:00',
        outTime: '17:00',
        date: new Date(2023, 9, 26),
        intervals: [
          { inTime: '09:00', outTime: '12:00', index: 1 },
          { inTime: '13:00', outTime: '17:00', index: 2 },
        ],
      },
      {
        id: '5',
        name: 'Hera',
        inTime: '08:30',
        outTime: '16:30',
        date: new Date(2023, 9, 27),
        intervals: [
          { inTime: '09:00', outTime: '12:00', index: 1 },
          { inTime: '13:00', outTime: '17:00', index: 2 },
        ],
      },
      {
        id: '6',
        name: 'Poseidon',
        inTime: '10:00',
        outTime: '18:00',
        date: new Date(2023, 9, 28),
        intervals: [
          { inTime: '09:00', outTime: '12:00', index: 1 },
          { inTime: '13:00', outTime: '17:00', index: 2 },
        ],
      },
    ];
    this.dataSource = new MatTableDataSource(tableContent);

    // Define the custom filter predicate
    this.dataSource.filterPredicate = (data: UserType, filter: string) => {
      const filterValues = JSON.parse(filter);
      const isNameMatch = data.name
        .trim()
        .toLowerCase()
        .includes(filterValues.name.trim().toLowerCase());
      const isDateMatch = this.isDateInRange(
        data.date,
        filterValues.startDate || ''
      );
      return isNameMatch && isDateMatch;
    };
  }

  isDateInRange(date: Date, startDate: Date | null): boolean {
    if (startDate) {
      const startDateObj = new Date(startDate); // Convert to Date object
      return (
        date.getDate() === startDateObj.getDate() &&
        date.getMonth() === startDateObj.getMonth() &&
        date.getFullYear() === startDateObj.getFullYear()
      );
    } else {
      return true;
    }
  }

  applyFilter() {
    const filterValue = {
      name: this.selectedEmployee,
      startDate: this.startDate,
    };
    this.dataSource.filter = JSON.stringify(filterValue);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    this.applyFilter();
  }

  onEmployeeChange(employee: string) {
    this.selectedEmployee = employee;
    this.applyFilter();
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  openDialog(row: UserType) {
    const dialogRef = this._dialog.open(AttendanceDialogComponent, {
      data: row.intervals,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'attendance-dialog',
  templateUrl: 'attendance-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceDialogComponent {
  displayedColumns: string[] = ['No.', 'inTime', 'outTime'];
  dataSource: MatTableDataSource<Interval>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Interval[]) {
    this.dataSource = new MatTableDataSource(data);
  }

  trackByFn(index: number, item: any) {
    return item.index;
  }
}
