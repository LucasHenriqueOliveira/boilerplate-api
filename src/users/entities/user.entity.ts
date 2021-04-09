import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
 
@Entity()
class User {

    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ unique: true })
    public email: string;
    
    @Column()
    public name: string;
    
    @Column()
    @Exclude()
    public password: string;

    @Column({ nullable: true })
    @Exclude()
    public currentHashedRefreshToken?: string;

    @Column({ nullable: true })
    public twoFactorAuthenticationSecret?: string;

    @Column({ default: false })
    public isTwoFactorAuthenticationEnabled: boolean;

}
 
export default User;