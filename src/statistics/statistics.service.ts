import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Statistics } from './entities/statistics.entity';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GetStatisticsDto } from './dto/get-statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('CLINIC_SERVICE') private readonly clinicClient: ClientProxy,
    @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
  ) {}

  private statistics = [];

  async updateStatistics() {
    try {
      const [
        totalPosts,
        totalUsers,
        totalClinics,
        totalDoctors,
        totalServices,
      ] = await Promise.all([
        lastValueFrom(this.postClient.send('get_total_posts_by_admin', {})),
        lastValueFrom(this.userClient.send('get_total_users_by_admin', {})),
        lastValueFrom(this.clinicClient.send('get_total_clinics_by_admin', {})),
        lastValueFrom(this.clinicClient.send('get_total_doctors_by_admin', {})),
        lastValueFrom(
          this.clinicClient.send('get_total_services_by_admin', {}),
        ),
      ]);

      // Update the state after all fetches are complete

      this.statistics = [
        { name: 'Total Users', count: totalUsers },
        { name: 'Total Clinics', count: totalClinics },
        { name: 'Total Posts', count: totalPosts },
        { name: 'Total Doctors', count: totalDoctors },
        { name: 'Total Services', count: totalServices },
      ];
    } catch (error) {
      console.error('Error updating statistics:', error);
    }
  }

  getStatistics() {
    return this.statistics;
  }

  async getClinicStatistics(getStatics: GetStatisticsDto) {
    return await lastValueFrom(
      this.clinicClient.send('get_clinic_statistics', getStatics),
    );
  }

  async getUserStatistics(getStatics: GetStatisticsDto) {
    return await lastValueFrom(
      this.userClient.send('get_user_statistics', getStatics),
    );
  }
}
