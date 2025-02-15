# Association-app
الجمعية الشهرية باستخدام لارافيل و رياكت :هي جمعية افراد شهرية لكل فرد اكثر من دور ولكل دور اكثر من فرد في اكثر من جمعية
- composer create-project laravel/laravel Associations
- cd Associations
- composer require laravel/breeze --dev
- php artisan breeze:install react
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=association_db
  DB_USERNAME=root
  DB_PASSWORD=
- php artisan migrate
- npm install animate.css --save
  import 'animate.css';
- php artisan make:model Association -mrc
- php artisan migrate
  class Association extends Model
  {
      protected $fillable = ['name', 'total_months', 'role_price'];
  }
- npm run dev
- php artisan make:model Role -mrc
- php artisan migrate
- npm run dev
- php artisan make:model Member -mrc
- php artisan migrate
- npm run dev
- php artisan make:model AssociationMember -mrc
- php artisan migrate
  public function association()
  {
      return $this->belongsTo(Association::class);
  }
  
   public function member()
  {
      return $this->belongsTo(Member::class);
  }
- add code to Models / Association
  public function members()
  {
      return $this->belongsToMany(Member::class, 'association_member')
                  ->withPivot('id', 'total_amount') // لتضمين عمود 'id' من الجدول الوسيط
                  ->withTimestamps();
  }
- add route
  Route::post('/associations/{association}/members', [AssociationController::class, 'storeMemberAssociation'])->name('associations.members.store');
- php artisan make:migration create_association_member_role_table --create=association_member_role
  //  App\Models\Association.php
  public function association_members()
  {
      return $this->hasMany(AssociationMember::class);
  }
- add to AssociationMember model
  public function roles()
  {
      return $this->belongsToMany(Role::class, 'association_member_role')
                  ->withPivot('paid_amount')
                  ->withTimestamps();
  }
- add to Member model
  public function associations()
  {
      return $this->belongsToMany(Association::class, 'association_member')
                  ->withPivot('id','total_amount')
                  ->withTimestamps();
  }
- add to Role model
  public function association_members()
  {
      return $this->belongsToMany(AssociationMember::class, 'association_member_role')
                  ->withPivot('paid_amount')
                  ->with('member') // تضمين بيانات العضو
                  ->withTimestamps();
  }
