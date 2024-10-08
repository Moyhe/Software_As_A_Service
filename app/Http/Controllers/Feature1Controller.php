<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Interfaces\Calculation;
use App\Models\Feature;
use App\Models\UsedFeature;
use Illuminate\Http\Request;

class Feature1Controller extends Controller implements Calculation
{
    public ?Feature $feature = null;

    public function __construct()
    {
        $this->feature = Feature::query()->where([
            ['route_name', '=', 'feature1.index'],
            ['active', '=', true]
        ])->firstOrFail();
    }

    public function index()
    {

        return inertia('Feature1/Index', [
            'feature' => new FeatureResource($this->feature),
            'answer' => session('answer')
        ]);
    }

    public function calculate()
    {

        $user = request()->user();

        if ($user->available_credits < $this->feature->required_credits) {
            return back();
        }

        $data = request()->validate([
            'number1' => ['required', 'numeric'],
            'number2' => ['required', 'numeric']
        ]);

        $number1 = floatval($data['number1']);
        $number2 = floatval($data['number2']);

        $user->decreaseCredits($this->feature->required_credits);

        UsedFeature::create([
            'feature_id' => $this->feature->id,
            'user_id' => $user->id,
            'credits' => $this->feature->required_credits,
            'data' => $data
        ]);

        return to_route('feature1.index')->with('answer', $number1 + $number2);
    }
}
