#include<bits/stdc++.h>
using namespace std;
int dup(int arr[],int n, vector<int>temp){
    
temp.push_back(arr[0]);
int i=0;
for(int j=0;j<n-1;j++){
   
   if(arr[i]==arr[j]){
       return i++;
      
   }
        temp.push_back(arr[j]);
      i+1=j;
      }
  
   
}  
    }
int main(){
    int n;
    cin>>n;
    int arr[n];
   
   for(int i=0;i<n;i++){
       cin>>arr[i];
   } 
    for(int i=0;i<n;i++){
        cout<<arr[i];
    }
 
 int res=dup(arr,n);
 cout<<res;

cout<<"array after removal of duplicates";
for(int i=0;i<n;i++){
        cout<<temp[i];
    }
    return 0;
}