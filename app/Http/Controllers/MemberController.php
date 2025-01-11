<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::latest()->paginate(10);
        return response()->json($members);
    }

    public function create()
    {
        return view('members.create');
    }

    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|unique:members,passport',
            'surname' => 'required|string|max:255',
            'otherNames' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'email' => 'required|email|unique:members,email',
            'dob' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:1024', // Max 1MB
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Handle file upload
            $photoPath = null;
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('member-photos', 'public');
            }

            // Create member
            $member = Member::create([
                'passport' => $request->id,
                'surname' => $request->surname,
                'other_names' => $request->otherNames,
                'phone_number' => $request->phone,
                'email' => $request->email,
                'DOB' => $request->dob,
                'gender' => $request->gender,
                'photo' => $photoPath,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Member registered successfully',
                'data' => $member
            ], 201);

        } catch (\Exception $e) {
            // If photo was uploaded but member creation failed, delete the photo
            if ($photoPath) {
                Storage::disk('public')->delete($photoPath);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while registering the member',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Member $member)
    {
        return response()->json([
            'status' => 'success',
            'data' => $member
        ]);
    }

    public function edit(Member $member)
    {
        return response()->json([
            'status' => 'success',
            'data' => $member
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validator = Validator::make($request->all(), [
            'surname' => 'sometimes|required|string|max:255',
            'other_names' => 'sometimes|required|string|max:255',
            'phone_number' => 'sometimes|required|string|max:15',
            'email' => 'sometimes|required|email|unique:members,email,' . $member->id,
            'DOB' => 'sometimes|required|date',
            'gender' => 'sometimes|required|in:male,female,other',
            'photo' => 'sometimes|image|mimes:jpeg,png,jpg|max:1024',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $updateData = $request->except(['photo']);

            if ($request->hasFile('photo')) {
                // Delete old photo
                if ($member->photo) {
                    Storage::disk('public')->delete($member->photo);
                }

                // Store new photo
                $photoPath = $request->file('photo')->store('member-photos', 'public');
                $updateData['photo'] = $photoPath;
            }

            $member->update($updateData);

            return response()->json([
                'status' => 'success',
                'message' => 'Member updated successfully',
                'data' => $member
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating the member',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Member $member)
    {
        try {
            // Delete photo if exists
            if ($member->photo) {
                Storage::disk('public')->delete($member->photo);
            }

            $member->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Member deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the member',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
