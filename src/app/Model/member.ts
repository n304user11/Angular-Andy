export class Member {
    id!: number;
    firstName!: string;
    lastName!: string;
    memberCardNumber!: string;
    policyNumber!: string;
    dataOfBirth!: string;

    constructor(member: any) {
        {
          this.id = member.id;
          this.firstName = member.firstName || '';
          this.lastName = member.lastName || '';
          this.memberCardNumber = member.memberCardNumber || '';
          this.policyNumber = member.policyNumber || '';
          this.dataOfBirth =  member.dataOfBirth || '';
        }
    }
}
